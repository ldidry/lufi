EXTRACTFILES=utilities/locales_files.txt
EN=themes/default/lib/Lufi/I18N/en.po
FR=themes/default/lib/Lufi/I18N/fr.po
XGETTEXT=carton exec local/bin/xgettext.pl
CARTON=carton exec
REAL_LUFI=script/application
LUFI=script/lufi

locales:
	$(XGETTEXT) -f $(EXTRACTFILES) -o $(EN) 2>/dev/null
	$(XGETTEXT) -f $(EXTRACTFILES) -o $(FR) 2>/dev/null

test:
	$(CARTON) $(REAL_LUFI) test

clean:
	rm -rf lufi.db files/
dev: clean
	$(CARTON) morbo $(LUFI) --listen http://0.0.0.0:3000 --watch lib/ --watch script/ --watch themes/ --watch lufi.conf

devlog:
	multitail log/development.log

prod:
	$(CARTON) hypnotoad -f $(LUFI)
