export const GlobalVariables = {

  downloadCSVFile: (data, filename) => {
    let blob = new Blob([data], { type: 'text/csv' });
    let dataURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  },

  subject_types: {
    1: 'Theory',
    2: 'Lab',
    3: 'Tutorial'
  },

  subject_types_array: [
    {
      key: 'Theory',
      value: 1
    },
    {
      key: 'Lab',
      value: 2
    },
    {
      key: 'Tutorial',
      value: 3
    },
  ],

  courses_list: [
    'BTECH',
    'BBA',
    'MBA'
  ],

  years_list: [
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ],

  semesters: [
    {
      key: 'First',
      value: 1
    },
    {
      key: 'Second',
      value: 2
    },
    {
      key: 'Third',
      value: 3
    },
    {
      key: 'Fourth',
      value: 4
    },
    {
      key: 'Fifth',
      value: 5
    },
    {
      key: 'Sixth',
      value: 6
    },
    {
      key: 'Seventh',
      value: 7
    },
    {
      key: 'Eighth',
      value: 8
    },
  ],

  getProperSuffix: (number) => {
    if (number === 1)
      return 'st'
    else if (number === 2)
      return 'nd'
    else if (number === 4)
      return 'rd'
    else return 'th'
  }

}