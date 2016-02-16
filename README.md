# Email Framework

Email Framework is a modular framework developed to be a boilerplate/workflow when coding your emails. It uses Premailer (optional FTP push, AWS S3, Litmus, Mailgun also implemented) and Grunt as task runner.


## Requirements
You might need to use sudo (for OSX, *nix) or run as Administrator (for Windows) to install the requirements below:

[Node.js](http://nodejs.org/)  
[Grunt](http://gruntjs.com/)  
[Git](https://git-scm.com/) \*¹   
[Ruby](https://www.ruby-lang.org/en/downloads/) \*²  
Premailer \*³  

\*¹<sub> Make sure to have ```git``` command on your system path.</sub>  
\*²<sub> Windows users: install Ruby using [RubyInstaller](http://rubyinstaller.org/downloads/) and also [RubyDevKit](http://rubyinstaller.org/downloads/) to build native C/C++ extensions for Ruby.</sub>  
\*³<sub> Run ```gem install premailer hpricot nokogiri``` to install Premailer.</sub>


## Usage

Assuming that all the requirements above are installed, download the [latest version](https://github.com/rafael-rpa/email-framework/archive/master.zip), uncompress and run ```npm install``` command under *_framework/grunt/* directory (this command need to be entered only once per project). 

All ```grunt``` commands also need to be executed in the *_framework/grunt/* directory. For the optional tasks below fill the respective fields in the *_confidential.yaml* file. It's also worth remembering to uncomment the line for the *_confidential.yaml* in the *.gitignore* file as you don't want to make public your private information (an alternative, if necessary, would be to use services as [git-crypt](https://github.com/AGWA/git-crypt) to encrypt your repository).

#### Premailer + Replace

Premailer and Replace tasks are both specified in the Watch task and they are responsible for inlining your CSS and replacing the relative images URL with the absolute ones.

To initiate the Watch task run ```grunt``` command. With the Watch task running any change on your HTML file(s), in the root folder, will run the Premailer and Replace tasks to inline your CSS and also use the variable previously set in the *_variables.json* file to replace the relative URL with the absolute. Final inlined file(s) will be created in the *dist/* folder.

```json
{
    "absoluteImagesURL" : "http://example.com/images-url/"
}
```

#### FTP push (optional)

Run ```grunt ftp_push``` to upload to your FTP server all images located in the *images/* folder.

```yaml
# grunt-ftp-push: https://github.com/Robert-W/grunt-ftp-push
"ftp_push": {
    "host": "ftp.example.com", # URL host of your FTP server.
    "username": "username",
    "password": "password",
    "dest": "destination-path-on-server/", # Destination of where you want to upload your files (relative to the root).
    "port": 21
}
```    

#### AWS S3 (optional)
Run ```grunt aws_s3``` to deploy to your bucket all images located in the *images/* folder.

```yaml
# grunt-aws-s3: https://github.com/MathieuLoutre/grunt-aws-s3
"aws_s3": {
    "accessKeyId": "amazon-s3-key", # Amazon S3 credentials key
    "secretAccessKey": "amazon-s3-secret", # Amazon S3 credentials secret
    "bucket": "amazon-s3-bucket-name", # Amazon S3 bucket name
    "region": "", # Amazon S3 region (if not specified, it uploads to the default 'US Standard').
    "access": "public-read", # A specific Amazon S3 ACL. Available ACL values at http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    "bucketDest": "destination-path-on-server/" # The path on S3 where the files will be uploaded, relative to the bucket.
}
```   

#### Litmus (optional)
Run ```grunt litmus``` to send email tests to [Litmus](https://litmus.com/) (all HTML files in the *dist/* folder will be sent and using the HTML title tag as the subject for your tests).

```yaml
# grunt-litmus: https://github.com/jeremypeter/grunt-litmus
"litmus": {
    "username": "username",
    "password": "password",
    "url": "https://yourcompany.litmus.com", # Litmus account URL (yourcompany name can be found in Account Settings > Profile > Subdomain for API)
    "clients": [# Array of email clients to test. Available values at https://yourcompany.litmus.com/clients.xml
                # Desktop
                "ol2003","ol2007","ol2010","ol2011","ol2013","ol2015",
                "appmail7","appmail8","thunderbirdlatest",
                # Mobile devices
                "android4","androidgmailapp",
                "iphone5s","iphone6","iphone6plus","iphone6s",
                "ipadmini","ipad",
                # Web-based
                "gmailnew","ffgmailnew","chromegmailnew",
                "chromegoogleapps","ffgoogleapps","googleapps",
                "outlookcom","chromeoutlookcom","office365",
                "yahoo","ffyahoo",
                "aolonline","chromeaolonline"]
}
```   

#### Mailgun (optional)
Run ```grunt mailgun``` to send email tests using [Mailgun](https://www.mailgun.com/) (all HTML files in the *dist/* folder will be sent).

```yaml
# grunt-mailgun: https://github.com/markhuge/grunt-mailgun
"mailgun": {
    "key": "yourmailgunapikey", # Your Mailgun API key.
    "sender": "postmaster@your-sandbox-mailgun.mailgun.org", # The 'from' name and address (acceptable domains may be restricted by your mailgun account settings).
    "recipient": ["recipient@example.com"], # One or more email addresses to send your email to.
    "subject": "Email test" # Optional field
}
```   

#### Responsive email template

Under the root folder you'll find a responsive template (tested and working across all major clients) to be used as a boilerplate. If you need the inlined version please refer to the same file in the *dist/* directory (in this case remember to replace the images URL).


## License

Copyright © 2015-2016 Rafael Pillon Almeida. Email Framework is a free software licensed under the terms specified in the [LICENSE](https://github.com/rafael-rpa/front-end-framework/blob/master/LICENSE.md) file.
