/**
  * Selects and HTML list (either `ul` or `ol` Element), and appends an `li` Element
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
  */
function addReferencesToList(html_list) {
  for (id in references) {
    var thisref = references[id];
    $(html_list).append($('<li>').append($('<cite>')
      .attr('id',id)
      .attr('itemprop','citation')
      .attr('itemscope','')
      .attr('itemtype',thisref.itemtype)
      .append(
        $('<span>').attr('itemprop','author').each(function () {
          for (var i = 0; i < thisref.author.length; i++) {
            if (i > 0) $(this).append(', ');
            if (0 < i && i == thisref.author.length-1) $(this).append(' &amp; ');
            $(this).append(
              $('<span>').attr('itemscope','').attr('itemtype','https://schema.org/Person')
                .append($('<span>').attr('itemprop','name').html('' + thisref.author[i].name))
            );
          }
        }),
        $('<time>').attr('itemprop','datePublished').attr('datetime',thisref.datePublished).html(' (' + thisref.datePublished + ').'),
        $('<span>').attr('itemprop','name').html(' ' + thisref.name + '.'),
        $('<span>').attr('itemprop','publisher').attr('itemscope','').attr('itemtype','https://schema.org/Organization').append(
          $('<span>').attr('itemprop','location').attr('itemscope','').attr('itemtype','https://schema.org/Place').append(
            $('<span>').attr('itemprop','address').attr('itemscope','').attr('itemtype','https://schema.org/PostalAddress').append(
              $('<span>').attr('itemprop','addressLocality').html(' ' + thisref.publisher.location.address.addressLocality + ','),
              $('<span>').attr('itemprop','addressRegion').html(' ' + thisref.publisher.location.address.addressRegion + ':')
            ),
            $('<span>').attr('itemprop','geo').attr('itemscope','').attr('itemtype','https://schema.org/GeoCoordinates').append(
              $('<meta>').attr('itemprop','latitude').attr('content', thisref.publisher.location.geo.latitude),
              $('<meta>').attr('itemprop','longitude').attr('content', thisref.publisher.location.geo.longitude)
            )
          ),
          $('<span>').attr('itemprop','name').html(' ' + thisref.publisher.name + '.')
        )
      )
    ));
  }
}

var references = {
  'Mardsen2003' : {
    itemtype : 'https://schema.org/Book',
    name : 'Vector calculus',
    bookEdition : '5',
    author : [
      { name : 'Marsden, J. E.' },
      { name : 'Tromba, A. J.' }
    ],
    datePublished : 2003,
    publisher : {
      name : 'W. H. Freeman and Company',
      location : {
        address : {
          addressLocality : 'New York',
          addressRegion : 'NY'
        },
        geo : {
          latitude : 40.7033127,
          longitude: -73.979681
        }
      }
    },
    alternateName : 'QA303 .M338 2003',
    isbn : '978-0716749929'
  },
  'Arnold2002' : {
    itemtype : 'https://schema.org/Book',
    name : 'An introduction to mathematical proofs',
    bookEdition : '',
    author : [
      { name : 'Arnold, J. T.' }
    ],
    datePublished : 2002,
    publisher : {
      name : '',
      location : {
        address : {
          addressLocality : '',
          addressRegion : ''
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : '',
    isbn : ''
  },
  'Hrbacek1984' : {
    itemtype : 'https://schema.org/Book',
    name : 'Introduction to set theory: Second edition, revised and expanded',
    bookEdition : '2',
    author : [
      { name : 'Hrbacek, K.' },
      { name : 'Jech, T.' }
    ],
    datePublished : 1984,
    publisher : {
      name : 'Marcel Dekker, Inc.',
      location : {
        address : {
          addressLocality : 'New York',
          addressRegion : 'NY'
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : 'QA248 .H68 1984',
    isbn : ''
  },
  'Halmos1974' : {
    itemtype : 'https://schema.org/Book',
    name : 'Naive set theory',
    bookEdition : '',
    author : [
      { name : 'Halmos, P. R.' }
    ],
    datePublished : 1974,
    publisher : {
      name : 'Springer-Verlag, Inc.',
      location : {
        address : {
          addressLocality : 'New York',
          addressRegion : 'NY'
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : 'QA248 .H26 1974 c.2',
    isbn : ''
  },
  'Faticoni2006' : {
    itemtype : 'https://schema.org/Book',
    name : 'The mathematics of infinity: A guide to great ideas',
    bookEdition : '',
    author : [
      { name : 'Faticoni, T. G.' }
    ],
    datePublished : 2006,
    publisher : {
      name : 'John Wiley and Sons, Inc.',
      location : {
        address : {
          addressLocality : 'Hoboken',
          addressRegion : 'NJ'
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : 'QA248 .F29 2006',
    isbn : ''
  },
  'Enderton1977' : {
    itemtype : 'https://schema.org/Book',
    name : 'Elements of set theory',
    bookEdition : '',
    author : [
      { name : 'Enderton, H. B.' }
    ],
    datePublished : 1977,
    publisher : {
      name : 'Adacemic Press, Inc.',
      location : {
        address : {
          addressLocality : 'New York',
          addressRegion : 'NY'
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : 'QA248 .E5',
    isbn : ''
  },
  'Durbin2005' : {
    itemtype : 'https://schema.org/Book',
    name : 'Modern algebra: An introduction',
    bookEdition : '5',
    author : [
      { name : 'Durbin, J. R.' }
    ],
    datePublished : 2005,
    publisher : {
      name : 'John Wiley and Sons, Inc.',
      location : {
        address : {
          addressLocality : 'Hoboken',
          addressRegion : 'NJ'
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : 'QA162 .D87 2005',
    isbn : ''
  },
  'Abbott2001' : {
    itemtype : 'https://schema.org/Book',
    name : 'Understanding analysis',
    bookEdition : '',
    author : [
      { name : 'Abbott, S.' }
    ],
    datePublished : 2001,
    publisher : {
      name : 'Springer Science+Business Media, LLC',
      location : {
        address : {
          addressLocality : 'New York',
          addressRegion : 'NY'
        },
        geo : {
          latitude : 0,
          longitude: 0
        }
      }
    },
    alternateName : 'QA300 .A18 2001',
    isbn : ''
  }
}
