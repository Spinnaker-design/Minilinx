const Browser = require( "zombie" );

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost( "localhost", 3000 );

describe( "User visits url form page", function() {

  const browser = new Browser();

  before( function( done ) {
    browser.visit( "/", done );
  } );

  describe( "submits shorten form", function() {

    before( function( done ) {
      browser
      .fill( "url",    "http://www.google.com" )
      .pressButton( "Shorten", done );
    } );

    it( "should be successful", function() {
      browser.assert.success();
    } );

    it( "should see detail page", function() {
      browser.assert.text( '[name="url"]', "http://www.google.com" );
    } );
  } );
} );

describe( "User visits url form page", function() {

  const browser = new Browser();

  before( function( done ) {
    browser.visit( "/", done );
  } );
  describe( "submits detail form", function() {

    before( function( done ) {
      browser
      .fill( "shortUrl", "http://node-express-env.mpw7wpz2uk.us-west-2.elasticbeanstalk.com/H1BfmiVEl" )
      .pressButton( "Details", done );
    } );

    it( "should be successful", function() {
      browser.assert.success();
    } );

    it( "should see detail page", function() {
      browser.assert.text( '[name="url"]', "http://www.google.com" );
    } );
  } );
} );

describe( "User visits url form page", function() {

  const browser = new Browser();

  before( function( done ) {
    browser.visit( "/", done );
  } );
  describe( "submits detail form with bad data", function() {
    it( "should NOT be successful", function() {
      browser
      .fill( "shortUrl", "http://node-express-env.mpw7wpz2uk.us-west-2.elasticbeanstalk.com/SomeJunk" )
      .pressButton( "Details", function( error ) {
        browser.assert.status( 404 );
      } );
    } );
  } );
} );

describe( "User visits shortened url", function() {

  const browser = new Browser();

  before( function( done ) {
    browser.visit( "/H1BfmiVEl", done );
  } );
  it( "should be successful", function() {
    browser.assert.redirected();
  } );
  it( "should be the full url", function() {
    browser.assert.url( "http://www.google.com" );
  } );
} );

describe( "User visits bad shortened url", function() {

  const browser = new Browser();

  it( "should NOT be successful", function( done ) {
    browser.visit( "/SomeJunk", function( error ) {
      browser.assert.status( 404 );
      done();
    } );
  } );
} );
