<?php

namespace WPE\FaustWP\Tests\Integration;

use \WP_UnitTestCase;
use function WPE\FaustWP\Settings\get_secret_key;

class ProcessTelemetryRouteTest extends WP_UnitTestCase
{
  private $request;
  private $route_name;

  private $valid_body = [
      "node_faustwp_core_version" => "xxxx",
      "node_faustwp_cli_version" => "xxxx",
      "node_faustwp_blocks_version" => "xxxx",
      "node_apollo_client_version" => "xxxx",
      "node_version" => "xxxx",
      "node_next_version" => "xxxx",
      "node_is_development" => "xxxx",
      "command" => "xxxx"
  ];

  protected $option = 'faustwp_settings';
	protected $init_settings = [
		'frontend_uri' => 'http://localhost:3000',
		'secret_key' => '2b9b7ec9-73f8-407d-b5b3-6f3e56bb555d',
		'menu_locations' => 'Primary, Footer',
		'enable_redirects' => '1',
		'enable_rewrites' => '1',
		'disable_theme' => '1',
	];

  public function setUp(): void
  {
    parent::setUp();

    update_option( $this->option, $this->init_settings );

    // Set up a REST server instance.
    global $wp_rest_server;

    $this->server = $wp_rest_server = new \WP_REST_Server;
    do_action( 'rest_api_init' );

    // Helper.
    $this->route_name = '/faustwp/v1/process_telemetry';
    $this->request = new \WP_REST_Request( 'POST', $this->route_name );
  }

  public function tearDown(): void
  {
    // Test cleanup.
    global $wp_rest_server;
    $wp_rest_server = null;

    parent::tearDown();

    delete_option( 'faustwp_settings' );
  }

  public function testRouteIsRegistered()
  {
    $routes = $this->server->get_routes();

    $this->assertArrayHasKey($this->route_name, $routes);
  }

  public function testRequestWithNoAuthHeaderReturnsForbidden()
  {
    $this->request->add_header('Content-Type', 'application/json');
    $this->request->set_body(json_encode($this->valid_body));

    $response = $this->server->dispatch( $this->request );

    $this->assertEquals( $response->status, 401 );
  }

  public function testRequestWithTelemetryDisabled()
  {
    $this->request->add_header('Content-Type', 'application/json');
    $this->request->add_header('x-faustwp-secret', 'valid-secret-key');
    $this->request->set_body(json_encode($this->valid_body));

    var_dump(get_option($this->option));

    var_dump(get_secret_key());

    $response = $this->server->dispatch( $this->request );

    var_dump($response);

    $this->assertEquals( $response->status, 204 );
  }

  public function testRequestWithTelemetryEnabled()
  {
    $this->request->add_header('Content-Type', 'application/json');
    $this->request->add_header('x-faustwp-secret', 'valid-secret-key');
    $this->request->set_body(json_encode($this->valid_body));

    $response = $this->server->dispatch( $this->request );

    $this->assertEquals( $response->status, 201 );
  }

}
