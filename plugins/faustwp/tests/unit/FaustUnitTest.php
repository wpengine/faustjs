<?php

namespace WPE\FaustWP\Tests\Unit;

use PHPUnit_Framework_TestCase;
use Brain\Monkey;

abstract class FaustUnitTest extends PHPUnit_Framework_TestCase {

    public function setUp(): void {
        parent::setUp();
        Monkey\setUp();
    }

    public function tearDown(): void {
        Monkey\tearDown();
        parent::tearDown();
    }
}
