EXTRACTDIR=-D lib -D themes/default/templates
EN=themes/default/lib/Lufi/I18N/en.po
FR=themes/default/lib/Lufi/I18N/fr.po
IT=themes/default/lib/Lufi/I18N/it.po
OC=themes/default/lib/Lufi/I18N/oc.po
CA=themes/default/lib/Lufi/I18N/ca.po
PT=themes/default/lib/Lufi/I18N/pt.po
NL=themes/default/lib/Lufi/I18N/nl.po
XGETTEXT=carton exec local/bin/xgettext.pl
CARTON=carton exec
REAL_LUFI=script/application
LUFI=script/lufi

locales:
	$(XGETTEXT) $(EXTRACTDIR) -o $(EN) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(FR) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(IT) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(OC) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(CA) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(PT) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(NL) 2>/dev/null

podcheck:
	podchecker lib/Lufi/DB/File.pm lib/Lufi/DB/Slice.pm

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
