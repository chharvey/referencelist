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
@param html_list       a string in jQuery selector format representing
                       the list to which to add references
  */
function addReferencesToList(reference_array, html_list) {
  var cite = d3.select(html_list).selectAll('li > cite')
    .data(reference_array).enter()
    .append('li')
      .append('cite').attr('itemprop','citation')
        .attr('itemscope','').attr('itemtype', function (d) { return d.itemtype; })
        .attr('id', function (d) { return d.id; });

  cite.author = cite.append('span').attr('itemprop','author') // array
    .append('span') // array element
      .attr('itemscope','').attr('itemtype','https://schema.org/Person')
      .append('span').attr('itemprop','name')
        .text(function (d) { return d.author[0].name; });

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
          .text(function (d) { return ' ' + d.publisher.location.address.addressRegion + ','; });

      cite.publisher.location.geo = cite.publisher.location.append('span').attr('itemprop','geo')
        .attr('itemscope','').attr('itemtype','https://schema.org/GeoCoordinates');

        cite.publisher.location.geo.append('meta').attr('itemprop','latitude')
          .attr('content', function (d) { return d.publisher.location.geo.latitude; });

        cite.publisher.location.geo.append('meta').attr('itemprop','longitude')
          .attr('content', function (d) { return d.publisher.location.geo.longitude; });

    cite.publisher.name = cite.publisher.append('span').attr('itemprop','name')
      .text(function (d) { return ' ' + d.publisher.name + '.' });

  // for (var j in reference_array) {
  //   var thisref = reference_array[j];
  //   $(html_list).append($('<li>').append($('<cite>')
  //     .attr('id',thisref.id)
  //     .attr('itemprop','citation')
  //     .attr('itemscope','')
  //     .attr('itemtype',thisref.itemtype)
  //     .append(
  //       $('<span>').attr('itemprop','author').each(function () {
  //         for (var i = 0; i < thisref.author.length; i++) {
  //           if (i > 0) {
  //             $(this).append(', ');
  //             if (i === thisref.author.length-1) $(this).append(' &amp; ');
  //           }
  //           $(this).append(
  //             $('<span>').attr('itemscope','').attr('itemtype','https://schema.org/Person')
  //               .append($('<span>').attr('itemprop','name').html('' + thisref.author[i].name))
  //           );
  //         }
  //       }),
  //       $('<time>').attr('itemprop','datePublished').attr('datetime',thisref.datePublished).html(' (' + thisref.datePublished + ').'),
  //       $('<span>').attr('itemprop','name').html(' ' + thisref.name + '.'),
  //       $('<span>').attr('itemprop','publisher').attr('itemscope','').attr('itemtype','https://schema.org/Organization').append(
  //         $('<span>').attr('itemprop','location').attr('itemscope','').attr('itemtype','https://schema.org/Place').append(
  //           $('<span>').attr('itemprop','address').attr('itemscope','').attr('itemtype','https://schema.org/PostalAddress').append(
  //             $('<span>').attr('itemprop','addressLocality').html(' ' + thisref.publisher.location.address.addressLocality + ','),
  //             $('<span>').attr('itemprop','addressRegion').html(' ' + thisref.publisher.location.address.addressRegion + ':')
  //           ),
  //           $('<span>').attr('itemprop','geo').attr('itemscope','').attr('itemtype','https://schema.org/GeoCoordinates').append(
  //             $('<meta>').attr('itemprop','latitude').attr('content', thisref.publisher.location.geo.latitude),
  //             $('<meta>').attr('itemprop','longitude').attr('content', thisref.publisher.location.geo.longitude)
  //           )
  //         ),
  //         $('<span>').attr('itemprop','name').html(' ' + thisref.publisher.name + '.')
  //       )
  //     )
  //   ));
  // }
}
