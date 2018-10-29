package Lufi::Plugin::Headers;
use Mojo::Base 'Mojolicious::Plugin';

sub register {
    my ($self, $app) = @_;

    # Assets Cache headers
    $app->plugin('StaticCache');

    # Add CSP Header
    if (!defined($app->config('csp')) || (defined($app->config('csp')) && $app->config('csp') ne '')) {
        my $directives = {
            'default-src'     => "'none'",
            'script-src'      => "'self' 'unsafe-inline' 'unsafe-eval'",
            'style-src'       => "'self' 'unsafe-inline'",
            'img-src'         => "'self' blob:",
            'media-src'       => "blob:",
            'font-src'        => "'self'",
            'form-action'     => "'self'",
            'base-uri'        => "'self'",
            'connect-src'     => {
                base => "'self'",
                ws   => 1
            }
        };

        my $frame_ancestors = '';
        $frame_ancestors = "'none'" if $app->config('x_frame_options') eq 'DENY';
        $frame_ancestors = "'self'" if $app->config('x_frame_options') eq 'SAMEORIGIN';
        if ($app->config('x_frame_options') =~ m#^ALLOW-FROM#) {
            $frame_ancestors = $app->config('x_frame_options');
            $frame_ancestors =~ s#ALLOW-FROM +##;
        }
        $directives->{'frame-ancestors'} = $frame_ancestors if $frame_ancestors;

        $app->plugin('CSPHeader',
            csp        => $app->config('csp'),
            directives => $directives
        );
    }

    # Add other headers
    $app->hook(
        before_dispatch => sub {
            my $c = shift;

            $c->res->headers->header('X-Frame-Options'        => $app->config('x_frame_options'))        if $app->config('x_frame_options');
            $c->res->headers->header('X-Content-Type-Options' => $app->config('x_content_type_options')) if $app->config('x_content_type_options');
            $c->res->headers->header('X-XSS-Protection'       => $app->config('x_xss_protection'))       if $app->config('x_xss_protection');
        }
    );

}

1;
