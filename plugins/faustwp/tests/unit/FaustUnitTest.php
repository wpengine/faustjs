<?php

namespace WPE\FaustWP\Tests\Unit;

use PHPUnit_Framework_TestCase;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Brain\Monkey;

abstract class FaustUnitTest extends PHPUnit_Framework_TestCase {

	// Adds Mockery expectations to the PHPUnit assertions count.
	use MockeryPHPUnitIntegration;

	function __construct() {
		// Manually require patchwork before running any tests.
		// Loaded here in order to not interfere with the primary bootstrap file.
		require_once __DIR__ . '/../../vendor/antecedent/patchwork/Patchwork.php';
	}

	public function setUp(): void {
		parent::setUp();
		Monkey\setUp();
	}

	public function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}
}
