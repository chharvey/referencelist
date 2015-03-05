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
      and
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
  var update = d3.select(html_list).selectAll('li').data(reference_array);
  update.enter().append('li');
  update.exit().remove();

  var cite = d3.select(html_list).selectAll('li').append('cite').attr('itemprop','citation')
    .attr('itemscope','').attr('itemtype', function (d) { return d.itemtype; })
    .attr('id', function (d) { return d.id; });

  cite.author = cite.append('span').attr('itemprop','author');

    cite.author.person = cite.author.selectAll('span')
      .data(function (d) { return d.author; }).enter()
      .append('span')
        .attr('itemscope','').attr('itemtype','https://schema.org/Person')
        .text(function (e, i) {
          (function count(property) {
            // provides a count on the number of items in the `property` array of a datum
            for (var i in reference_array) {
              for (var j in reference_array[i][property]) {
                reference_array[i][property][j].parent_length = reference_array[i][property].length;
              }
            }
          })('author');
          var returned = '';
          if (i > 0) { returned += ',';
            if (i === e.parent_length-1) returned += ' & ';
          }
          return returned;
        });

      cite.author.person.name = cite.author.person.append('span').attr('itemprop','name')
        .text(function (e) { return e.name; });

  cite.datePublished = cite.append('time').attr('itemprop','datePublished')
    .attr('datetime', function (d) { return d.datePublished; })
    .text(function (d) { return ' (' + d.datePublished + ').'; });

  cite.name = cite.append('span').attr('itemprop','name')
    .text(function (d) { return ' ' + d.name + '.'; });

  cite.publisher = cite.append('span').attr('itemprop','publisher')
    .attr('itemscope','').attr('itemtype','https://schema.org/Organization');

    cite.publisher.location = cite.publisher.append('span').attr('itemprop','location')
      .attr('itemscope','').attr('itemtype','https://schema.org/Place');

      cite.publisher.location.address = cite.publisher.location.append('span').attr('itemprop','address')
        .attr('itemscope','').attr('itemtype','https://schema.org/PostalAddress');

        cite.publisher.location.address.append('span').attr('itemprop','addressLocality')
          .text(function (d) { return ' ' + d.publisher.location.address.addressLocality + ','; })

        cite.publisher.location.address.append('span').attr('itemprop','addressRegion')
          .text(function (d) { return ' ' + d.publisher.location.address.addressRegion + ':'; });

      cite.publisher.location.geo = cite.publisher.location.append('span').attr('itemprop','geo')
        .attr('itemscope','').attr('itemtype','https://schema.org/GeoCoordinates');

        cite.publisher.location.geo.append('meta').attr('itemprop','latitude')
          .attr('content', function (d) { return d.publisher.location.geo.latitude; });

        cite.publisher.location.geo.append('meta').attr('itemprop','longitude')
          .attr('content', function (d) { return d.publisher.location.geo.longitude; });

    cite.publisher.name = cite.publisher.append('span').attr('itemprop','name')
      .text(function (d) {
        return ' ' + d.publisher.name + (d.publisher.name.substr(-1) === '.' ? '' : '.')
      });

  console.log(cite);

  /**
    * Appends an HTML element, marked up with microdata, to a given element. This function is
    * cleaner, but more verbose. Examples below. The first is using normal d3 syntax while
    * the second uses this function.
  ```
  var user_rating = user_review.append('span').attr('itemprop', 'rating')
    .attr('itemscope','').attr('itemtype','https://schema.org/Rating')
    .text(function (d) { return d.rating + ' out of 5 stars.'; });
  user_rating.append('meta').attr('itemprop','ratingValue')
    .attr('content',function (d) { return d.rating; });
  user_rating.append('meta').attr('itemprop','bestRating')
    .attr('content', 5);
  ```
  ```
  var user_rating = appendMicrodata(user_review, {
    element: 'span',
    itemprop: 'rating',
    itemtype: 'https://schema.org/Rating',
    text: function (d) { return d.rating + ' out of 5 stars.'; }
  });
  appendMicrodata(user_rating, {
    element: 'meta',
    itemprop: 'ratingValue',
    content: function (d) { return d.rating; }
  });
  appendMicrodata(user_rating, {
    element: 'meta',
    itemprop: 'bestRating',
    content: 5
  });
  ```
  @param d3object the object on which to call d3's `.append()` method
  @param args     an object of the form:
  {
    element  : required string. the name of the element to append (with no angle brackets),
    itemprop : optional string. the value(s) of the `itemprop` attribute of the new element,
    itemtype : optional string. the full value of the `itemtype` attribute,
    content  : optional string or function. takes (d) as an argument and returns the `[content]` attribute's value,
    text     : optional string or function. takes (d) as an argument and returns the text,
  }
    */
  function appendMicrodata(d3object, args) {
    var el = d3object.append(args.element);
    if (args.itemprop) el.attr('itemprop',args.itemprop);
    if (args.itemtype) el.attr('itemscope','').attr('itemtype',args.itemtype);
    if (args.content)  el.attr('content',args.content);
    el.text(args.text || '');
    return el;
  }
}
