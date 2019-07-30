EXTRACTDIR=-D lib -D themes/default/templates
POT=themes/default/lib/Lufi/I18N/lufi.pot
XGETTEXT=carton exec local/bin/xgettext.pl -u
CARTON=carton exec
REAL_LUFI=script/application
LUFI=script/lufi

locales:
	$(XGETTEXT) $(EXTRACTDIR) -o $(POT) 2>/dev/null

push-locales: locales
	zanata-cli -q -B push --errors --project-version `git branch | grep \* | cut -d ' ' -f2-`

pull-locales:
	zanata-cli -q -B pull --min-doc-percent 50 --project-version `git branch | grep \* | cut -d ' ' -f2-`

stats-locales:
	zanata-cli -q stats --project-version `git branch | grep \* | cut -d ' ' -f2-`

podcheck:
	podchecker lib/Lufi/DB/File.pm lib/Lufi/DB/Slice.pm

cover:
	PERL5OPT='-Ilib/' HARNESS_PERL_SWITCHES='-MDevel::Cover' $(CARTON) cover --ignore_re '^local'

test:
	@PERL5OPT='-Ilib/' HARNESS_PERL_SWITCHES='-MDevel::Cover' $(CARTON) prove -l -f -o t/test.t

clean:
	rm -rf lufi.db files/

dev: clean
	$(CARTON) morbo $(LUFI) --listen http://0.0.0.0:3000 --watch lib/ --watch script/ --watch themes/ --watch lufi.conf

ldap:
	sudo docker run --privileged -d -p 389:389 rroemhild/test-openldap; exit 0

ldapdev: ldap dev

devlog:
	multitail log/development.log

prod:
	$(CARTON) hypnotoad -f $(LUFI)
