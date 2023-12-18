<?php

namespace WPE\FaustWP\Tests\Integration;

use \WP_UnitTestCase;

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
		'secret_key' => 'valid-secret-key',
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
    $data = $response->get_data();

    $response->

    $this->assertEquals( $data['http_response'], 401 );
  }

  public function testRequestWithTelemetryDisabled()
  {
    $this->request->add_header('Content-Type', 'application/json');
    $this->request->add_header('x-faustwp-secret', 'valid-secret-key');
    $this->request->set_body(json_encode($this->valid_body));

    $response = $this->server->dispatch( $this->request );

    var_dump($response->status);

    var_dump($response);

    $data = $response->get_data();

    var_dump($data);

    $this->assertEquals( $data['http_response'], 204 );
  }

  public function testRequestWithTelemetryEnabled()
  {
    $this->request->add_header('Content-Type', 'application/json');
    $this->request->set_body(json_encode($this->valid_body));

    $response = $this->server->dispatch( $this->request );
    $data = $response->get_data();

    $this->assertEquals( $data['http_response'], 201 );
  }

}
