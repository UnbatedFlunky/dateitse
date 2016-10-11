angular.module('dateitse.catalog.company-filter', [])

  .filter('companyFilter', companyFilter)

;

function companyFilter() {
  return function (companies, query) {
    var searchText = query.searchText;
    var searchEducations = [];
    var searchPositions = [];

    // Prepare the educations array to match that of the companies
    angular.forEach(query.educations, function (education) {
      if (education.selected) {
        switch (education.title) {
          case 'Elektroteknik':
            searchEducations.push('E');
            break;
          case 'Datateknik':
            searchEducations.push('D');
            break;
          case 'Informationsteknik':
            searchEducations.push('IT');
            break;
          default:
            break;
        }
      }
    });

    angular.forEach(query.positions, function (position) {
      if (position.selected) {
        searchPositions.push(position.title);
      }
    });


    // Apply a filter to each company...
    return companies.filter(function (company) {

      // If the array of educations is populated, check if there is a match for every entry in the company
      var educationHit = searchEducations.length === 0 || searchEducations.every(function (education) {
          // If not every education in the previous array can be found, educationHit will be false
          return company.educations.indexOf(education) > -1;
        });

      // Same thing goes for position
      var positionHit = searchPositions.length === 0 || searchPositions.every(function (position) {
          return company.positions.indexOf(position) > -1;
        });

      // Finally compare the name and return that in conjunction with educationHit and positionHit
      return (company.name.trim().toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1 && educationHit && positionHit);
    });
  }
}
