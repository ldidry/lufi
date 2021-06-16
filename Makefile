EXTRACTDIR ?= -D lib -D themes/default/templates
POT ?= themes/default/lib/Lufi/I18N/lufi.pot
ENPO ?= themes/default/lib/Lufi/I18N/en.po
XGETTEXT ?= carton exec local/bin/xgettext.pl -u
CARTON ?= carton exec
REAL_LUFI ?= script/application
LUFI ?= script/lufi
LDAP_CONTAINER_IMAGE ?= rroemhild/test-openldap:latest
LOCAL_LDAP_PORT ?= 10389
LOCAL_SWIFT_PORT ?= 8080
SWIFT_CONTAINER_IMAGE ?= swiftstack/picoswiftstack:latest
MORBO_HOST ?= 0.0.0.0
MORBO_PORT ?= 3000


locales:
	$(XGETTEXT) $(EXTRACTDIR) -o $(POT) 2>/dev/null
	$(XGETTEXT) $(EXTRACTDIR) -o $(ENPO) 2>/dev/null

podcheck:
	podchecker lib/Lufi/DB/File.pm lib/Lufi/DB/Slice.pm lib/Lufi/DB/Invitation.pm

cover:
	PERL5OPT='-Ilib/' HARNESS_PERL_SWITCHES='-MDevel::Cover' $(CARTON) cover --ignore_re '^local'

test:
	@PERL5OPT='-Ilib/' HARNESS_PERL_SWITCHES='-MDevel::Cover' $(CARTON) prove -l -f -o t/test.t

clean:
	rm -rf lufi.db files/

dev: clean
	$(CARTON) morbo $(LUFI) --listen http://$(MORBO_HOST):$(MORBO_PORT) --watch lib/ --watch script/ --watch themes/ --watch lufi.conf

ldap:
	sudo docker run -d -p $(LOCAL_LDAP_PORT):10389 $(LDAP_CONTAINER_IMAGE); exit 0

ldapdev: ldap dev

swift:
	sudo docker run -d --rm -p $(LOCAL_SWIFT_PORT):8080 --hostname="picoswiftstack" --name="picoswiftstack" $(SWIFT_CONTAINER_IMAGE); exit 0
	@echo "Sleeping 20 seconds to let picoswiftstack start"
	@sleep 20
	sudo docker exec picoswiftstack get_auth

swiftdev: swift dev

devlog:
	multitail log/development.log

prod:
	$(CARTON) hypnotoad -f $(LUFI)
