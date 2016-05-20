# Lufi

## What does Lufi mean?

Lufi means Let's Upload that FIle.

## What does it do?

It stores files and allows you to download them.

Is that all? No. All the files are encrypted **by the browser**! It means that your files **never** leave your computer unencrypted.
The administrator of the Lufi instance you use will not be able to see what is in your file, neither will your network administrator, or your ISP.

The encryption key part of the URL is a anchor (Cf. [Fragment Identifier](https://en.wikipedia.org/wiki/Fragment_identifier)), that means this part is only processed client-side and does not reached the server. :-)

## License

Lufi is licensed under the terms of the AGPL. See the [LICENSE](LICENSE) file.

## Official instance

There is a demonstration site, available at <https://demo.lufi.io>, with strong limitations on time and file size.

To really use Lufi, you can go to <https://framadrop.org>, provided by the [Framasoft association](http://framasoft.org) (you can help them to keep providing free services at <https://soutenir.framasoft.org>).

## Logo

Because Lufi is quite similar to Luffy, like in "[Monkey D. Luffy](https://en.wikipedia.org/wiki/Monkey_D._Luffy)" from [One Piece](https://en.wikipedia.org/wiki/One_Piece) manga, the logo is a straw hat, made with pain, love and [Inkscape](https://inkscape.org/).

## Wiki (work in progress)

The official wiki will contain all what you need to know about Lufi (installation, configuration, etc). Go to <https://git.framasoft.org/luc/lufi/wikis/home> or clone it:

```
git clone https://git.framasoft.org/luc/lufi.wiki.git
```

## Encryption

All the encryption/decryption process takes place in your browser. The encryption key is never sent over the network.

However please note that some metadata are sent unencrypted:

* the file name
* its size
* its mimetype

## Internationalization

Lufi comes with English and French languages. It will choose the language to display from the browser's settings.

If you want to add a language, merge-requests are welcome.

## Authors

See [AUTHORS.md](AUTHORS.md) file.

## Contribute!

Please consider contributing, either by [reporting issues](https://git.framasoft.org/luc/lufi/issues) or by helping the internationalization. And of course, code contributions are welcome!

The details on how to contribute are on the [wiki](https://git.framasoft.org/luc/lufi/wikis/contribute).

## Other dependencies

Lufi is written in Perl with the [Mojolicious](http://mojolicio.us) framework.

It uses:

* [Materialize](http://materializecss.com/) framework to look not too ugly
* [jQuery](https://jquery.com)
* [Stanford Javascript Crypto Library](http://bitwiseshiftleft.github.com/sjcl/)
* [Moment.js](http://momentjs.com/) for displaying real dates instead of unix timestamps.
* [Filesize.js](http://filesizejs.com/) for displaying file sizes

