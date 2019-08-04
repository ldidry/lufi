# Lufi

## What does Lufi mean?

Lufi means Let's Upload that FIle. It's a E2E encrypted file sharing software.

## Which browsers are compatible?

Lufi is tested and working on the following browsers / devices :
    - Firefox
    - Chrome
    - Internet Explorer 11
    - Microsoft Edge
    - Safari
    - iOS devices (ipad, iphone)
    - Android devices (Galaxy tab, Galaxy S8)

## What does it do?

It stores files and allows you to download them.

Is that all? No. All the files are encrypted **by the browser**! It means that your files **never** leave your computer unencrypted.
The administrator of the Lufi instance you use will not be able to see what is in your file, neither will your network administrator, or your ISP.

The encryption key part of the URL is a anchor (Cf. [Fragment Identifier](https://en.wikipedia.org/wiki/Fragment_identifier)), that means this part is only processed client-side and does not reach the server. :-)

## License

Lufi is licensed under the terms of the AGPL. See the [LICENSE](LICENSE) file.

## Official instance

There is a demonstration site, available at <https://demo.lufi.io>, with strong limitations on time and file size.

To really use Lufi, you can go to <https://framadrop.org>, provided by the [Framasoft association](https://framasoft.org) (you can help them to keep providing free services at <https://soutenir.framasoft.org>).

## Logo

Because Lufi is quite similar to Luffy, like in "[Monkey D. Luffy](https://en.wikipedia.org/wiki/Monkey_D._Luffy)" from [One Piece](https://en.wikipedia.org/wiki/One_Piece) manga, the logo is a straw hat, made with pain, love and [Inkscape](https://inkscape.org/).

## Wiki (work in progress)

The official wiki will contain all you need to know about Lufi (installation, configuration, etc.). Go to <https://framagit.org/fiat-tux/hat-softwares/lufi/wikis/home> or clone it:

```
git clone https://framagit.org/fiat-tux/hat-softwares/lufi.wiki.git
```

## Encryption

All the encryption/decryption processes take place in your browser. The encryption key is never sent over the network.

However please note that some metadata are sent unencrypted:

* the file name
* its size
* its mimetype

## Client

There is the web interface, but you can use a CLI client too! Have a look at [lufi-cli](https://framagit.org/fiat-tux/hat-softwares/lufi-cli) or install it directly with `sudo npm install -g lufi-cli`.

There is another client in Python too: <https://framagit.org/setop/pylufic>.

## Internationalization

Lufi comes with several languages.

Please, see [this wiki page](https://framagit.org/fiat-tux/hat-softwares/lufi/wikis/contribute#internationalization) to know how to contribute to internationalization.

## Authors

See [AUTHORS.md](AUTHORS.md) file.

## Contribute!

Please consider contributing, either by [reporting issues](https://framagit.org/fiat-tux/hat-softwares/lufi/issues) or by helping the internationalization. And of course, code contributions are welcome!

The details on how to contribute are on the [wiki](https://framagit.org/fiat-tux/hat-softwares/lufi/wikis/contribute).

This software uses [Fiat Tux Code of conduct](https://framagit.org/fiat-tux/code-of-conduct/blob/master/README.md).

## Make a donation

You can make a donation to the author on [Tipeee](https://www.tipeee.com/fiat-tux) or on [Liberapay](https://liberapay.com/sky/).

## Other dependencies

Lufi is written in Perl with the [Mojolicious](http://mojolicio.us) framework.

It uses:

* [Materialize](http://materializecss.com/) framework to look not too ugly
* [jQuery](https://jquery.com)
* [Stanford Javascript Crypto Library](http://bitwiseshiftleft.github.com/sjcl/)
* [Moment.js](http://momentjs.com/) for displaying real dates instead of unix timestamps.
* [Filesize.js](http://filesizejs.com/) for displaying file sizes
