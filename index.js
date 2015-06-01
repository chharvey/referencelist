/**
  * Selects an HTML list (either `ul` or `ol` Element), and appends an `li` Element
  * for each item in the Global `references` object (below).
  * Each `li` Element contains `span` Elements marked up with Microdata (Schema.org)
  * that represents the actual reference. Example:
<li>
  <cite id="Mardsen2003" itemprop="citation" itemscope="" itemtype="https://schema.org/Book">
    <span itemprop="author">
      <span itemscope="" itemtype="http://schema.org/Person">
        <span itemprop="name">Mardsen, J. E.</span>
      </span>
      , &amp;
      <span itemscope="" itemtype="http://schema.org/Person">
        <span itemprop="name">Tromba, A. J.</span>
      </span>
    </span>
    <time itemprop="datePublished" datetime="2003">(2003).</time>
    <span itemprop="name">Vector calculus.</span>
    <span itemprop="publisher" itemscope="" itemtype="http://schema.org/Organization">
      <span itemprop="location" itemscope="" itemtype="http://schema.org/Place">
        <span itemprop="address" itemscope="" itemtype="http://schema.org/PostalAddress">
          <span itemprop="addressLocality">New York,</span>
          <span itemprop="addressRegion">NY:</span>
        </span>
        <span itemprop="geo" itemscope="http://schema.org/GeoCoordinates">
          <meta itemprop="latitude" content="40.7033127"/>
          <meta itemprop="longitude" content="-73.979681"/>
        </span>
      </span>
      <span itemprop="name">W. H. Freeman and Company</span>.
    </span>
  </cite>
</li>
@param reference_array the array of reference objects to add to the list
@param html_list       a string in jQuery/d3 selector format representing
                       the list to which to add references
  */
function addReferencesToList(reference_array, html_list) {
  var update = d3.select(html_list).selectAll('li').data(reference_array)
  update.enter().append('li')
  update.exit().remove()

  var cite = update.append('cite').attr('itemprop','citation')
    .attr('itemscope','').attr('itemtype', function (d) { return d.itemtype })
    .attr('id', function (d) { return d.id })

  var author = cite.append('span').attr('itemprop','author')

  author.update = author.selectAll('span').data(function (d) { return d.author })
  author.update.enter().append('span') // itemtype="Person"
  author.update.exit().remove()

  author.update
    .attr('itemscope','').attr('itemtype','https://schema.org/Person')
    .classed('Person', true)
    .text(function (e, i) {
      var n_last_author = this.parentNode.__data__.author.length - 1;
      return i > 0 ? ', ' + (i === n_last_author ? '& ' : '') : ''
    })

    var author_name = author.update.append('span').attr('itemprop','name')
      .text(function (e) { return e.name })

  var datePublished = cite.append('time').attr('itemprop','datePublished')
    .attr('datetime', function (d) { return d.datePublished })
    .text(function (d) { return ' (' + d.datePublished + ').' })

  var name = cite.append('span').attr('itemprop','name')
    .text(function (d) { return ' ' + d.name + '.' })

  var publisher = cite.append('span').attr('itemprop','publisher')
    .attr('itemscope','').attr('itemtype','https://schema.org/Organization')

    var publisher_location = publisher.append('span').attr('itemprop','location')
      .attr('itemscope','').attr('itemtype','https://schema.org/Place')

      var publisher_location_address = publisher_location.append('span').attr('itemprop','address')
        .attr('itemscope','').attr('itemtype','https://schema.org/PostalAddress')

        var publisher_location_address_addressLocality = publisher_location_address.append('span').attr('itemprop','addressLocality')
          .text(function (d) { return ' ' + d.publisher.location.address.addressLocality + ',' })

        var publisher_location_address_addressRegion = publisher_location_address.append('span').attr('itemprop','addressRegion')
          .text(function (d) { return ' ' + d.publisher.location.address.addressRegion + ':' })

      var publisher_location_geo = publisher_location.append('span').attr('itemprop','geo')
        .attr('itemscope','').attr('itemtype','https://schema.org/GeoCoordinates')

        var publisher_location_geo_latitude = publisher_location_geo.append('meta').attr('itemprop','latitude')
          .attr('content', function (d) { return d.publisher.location.geo.latitude })

        var publisher_location_geo_longitude = publisher_location_geo.append('meta').attr('itemprop','longitude')
          .attr('content', function (d) { return d.publisher.location.geo.longitude })

    var publisher_name = publisher.append('span').attr('itemprop','name')
      .text(function (d) {
        return ' ' + d.publisher.name + (d.publisher.name.slice(-1) === '.' ? '' : '.')
      })

  // This function takes the `itemprop` attribute (if it exists)
  // of an element (or d3 selection of elements)
  // and appends it to the `class` attribute of that element,
  // proceeded by a `?`.
  //
  // Example: given <div class="foo" itemprop = 'address'> as a d3 selection,
  // this function will do: <div class="foo ?address">.
  function addClassItemprop(d3_selection) {
    d3_selection.attr('class', function () {
      var self = d3.select(this)
      return (self.attr('class') || '') +
             (self.attr('itemprop') ? ' ?' + self.attr('itemprop') : '')
    })
    return d3_selection
  }
  addClassItemprop(d3.selectAll('[itemprop]'))

  return update

  /**
    * Appends an HTML element, marked up with microdata, to a given element. This function is
    * cleaner, but more verbose. Examples below. The first is using normal d3 syntax while
    * the second uses this function.
  ```
  var user_rating = user_review.append('span').attr('itemprop', 'rating')
    .attr('itemscope','').attr('itemtype','https://schema.org/Rating')
    .text(function (d) { return d.rating + ' out of 5 stars.' })
  user_rating.append('meta').attr('itemprop','ratingValue')
    .attr('content',function (d) { return d.rating })
  user_rating.append('meta').attr('itemprop','bestRating')
    .attr('content', 5)
  ```
  ```
  var user_rating = appendMicrodata(user_review, {
    element: 'span'
  , itemprop: 'rating'
  , itemtype: 'https://schema.org/Rating'
  , text: function (d) { return d.rating + ' out of 5 stars.' }
  })
  appendMicrodata(user_rating, {
    element: 'meta'
  , itemprop: 'ratingValue'
  , content: function (d) { return d.rating }
  })
  appendMicrodata(user_rating, {
    element: 'meta'
  , itemprop: 'bestRating'
  , content: 5
  })
  ```
  @param d3object the object on which to call d3's `.append()` method
  @param args     an object of the form:
  {
    element  : required string. the name of the element to append (with no angle brackets)
  , itemprop : optional string. the value(s) of the `itemprop` attribute of the new element
  , itemtype : optional string. the full value of the `itemtype` attribute
  , content  : optional string or function. takes (d) as an argument and returns the `[content]` attribute's value
  , text     : optional string or function. takes (d) as an argument and returns the text
  }
    */
  function appendMicrodata(d3object, args) {
    var el = d3object.append(args.element)
    if (args.itemprop) el.attr('itemprop',args.itemprop)
    if (args.itemtype) el.attr('itemscope','').attr('itemtype',args.itemtype)
    if (args.content)  el.attr('content',args.content)
    el.text(args.text || '')
    return el
  }
}
