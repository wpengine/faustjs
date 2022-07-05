<?php
/**
 * Alias Test classes for better Intelephense detection.
 *
 * This allows Intelephense in VSCode to be able to find the assertion
 * references and avoids the associated errors it throws otherwise.
 */

// phpcs:disable Generic.Files.OneObjectStructurePerFile.MultipleFound
class PHPUnit_Framework_TestCase extends \PHPUnit\Framework\TestCase {}
class PHPUnit_Framework_Exception extends \PHPUnit\Framework\Exception {}
class PHPUnit_Framework_ExpectationFailedException extends \PHPUnit\Framework\ExpectationFailedException {}
class PHPUnit_Framework_Error_Deprecated extends \PHPUnit\Framework\Error\Deprecated {}
class PHPUnit_Framework_Error_Notice extends \PHPUnit\Framework\Error\Notice {}
class PHPUnit_Framework_Error_Warning extends \PHPUnit\Framework\Error\Warning {}
class PHPUnit_Framework_Test extends \PHPUnit\Framework\Test {}
class PHPUnit_Framework_Warning extends \PHPUnit\Framework\Warning {}
class PHPUnit_Framework_AssertionFailedError extends \PHPUnit\Framework\AssertionFailedError {}
class PHPUnit_Framework_TestSuite extends \PHPUnit\Framework\TestSuite {}
class PHPUnit_Framework_TestListener extends \PHPUnit\Framework\TestListener {}
class PHPUnit_Util_GlobalState extends \PHPUnit\Util\GlobalState {}
class PHPUnit_Util_Getopt extends \PHPUnit\Util\Getopt {}
