/*global module:false*/
module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        variables: grunt.file.readJSON('../../_variables.json'),
        confidential: grunt.file.readYAML('../../_confidential.yaml'),

        premailer: {
            target: {
                options: {
                    preserveStyles: true,
                    warnLevel: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '../../',
                    src: ['*.html'],
                    dest: '../../dist/'
                }]
            }
        },

        // The reason for using the "replace" task below instead of the already inbuilt "baseUrl" option from "premailer" is that the last one just append the base URL and not fully replace
        replace: {
            target: {
                options: {
                    usePrefix: false,
                    patterns: [{
                        match: /(<img[^>]+[\"'])(images\/)/gi, // <img * src="images/ or <img * src='images/'
                        replacement: '$1<%= variables.absoluteImagesURL %>'
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '../../dist/',
                    src: ['*.html'],
                    dest: '../../dist/'
                }]
            }
        },

        ftp_push: {
            target: {
                options: {
                    host: '<%= confidential.ftp_push.host %>',
                    username: '<%= confidential.ftp_push.username %>',
                    password: '<%= confidential.ftp_push.password %>',
                    dest: '<%= confidential.ftp_push.dest %>',
                    port: '<%= confidential.ftp_push.port %>'
                },
                files: [{
                    expand: true,
                    cwd: '../../images/',
                    src: ['**/*.{png,jpg,gif}']
                }]
            }
        },

        aws_s3: {
            target: {
                options: {
                    accessKeyId: '<%= confidential.aws_s3.accessKeyId %>',
                    secretAccessKey: '<%= confidential.aws_s3.secretAccessKey %>',
                    bucket: '<%= confidential.aws_s3.bucket %>',
                    region: '<%= confidential.aws_s3.region %>',
                    access: '<%= confidential.aws_s3.access %>',
                },
                files: [{
                    expand: true,
                    cwd: '../../images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest : '<%= confidential.aws_s3.bucketDest %>'
                }]
            }
        },

        mailgun: {
            test: {
                options: {
                    key: '<%= confidential.mailgun.key %>',
                    domain: '<%= confidential.mailgun.domain %>',
                    sender: '<%= confidential.mailgun.sender %>',
                    recipient: '<%= confidential.mailgun.recipient %>',
                    subject: '<%= confidential.mailgun.subject %>'
                },
                src: ['../../dist/*.html']
            }
        },

        litmus: {
            test: {
                options: {
                    username: '<%= confidential.litmus.username %>',
                    password: '<%= confidential.litmus.password %>',
                    url: '<%= confidential.litmus.url %>',
                    clients: '<%= confidential.litmus.clients %>'
                },
                src: ['../../dist/*.html']
            }
        },

        watch: {
            html: {
                files: ['../../*.html'],
                tasks: ['premailer', 'replace']
            }
        }

    });

    grunt.registerTask('default', ['watch', 'premailer', 'replace']);

};
