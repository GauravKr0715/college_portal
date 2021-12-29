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

  joining_years_list: [
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
  ],

  years: [
    {
      key: 'First Year',
      value: 1
    },
    {
      key: 'Second Year',
      value: 2
    },
    {
      key: 'Third Year',
      value: 3
    },
    {
      key: 'Fourth Year',
      value: 4
    }
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
    else if (number === 3)
      return 'rd'
    else return 'th'
  },

  time_table_slots: [
    "09.10 - 10.05",
    "10.05 - 11.00",
    "11.00 - 11.30",
    "11.30 - 12.25",
    "12.25 - 13.20",
    "13.20 - 14.15",
    "14.15 - 15.10",
  ],

  week_days: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Saturday'
  ],

  default_section_time_table: [
    [
      { "slot_id": "D1S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D1S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D1S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D1S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D1S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D1S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" }
    ], [
      { "slot_id": "D2S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D2S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D2S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D2S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D2S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D2S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" }
    ], [
      { "slot_id": "D3S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D3S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D3S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D3S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D3S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D3S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" }
    ], [
      { "slot_id": "D4S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D4S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D4S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D4S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D4S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D4S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" }
    ], [
      { "slot_id": "D5S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D5S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D5S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D5S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D5S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D5S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" }
    ], [
      { "slot_id": "D6S1", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D6S2", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D6S3", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D6S4", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D6S5", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" },
      { "slot_id": "D6S6", "class_id": "ABC123", "subject_id": "UND123", "subject_name": "Unalloted", "subject_type": "0", "faculty_id": "UND123", "faculty_name": "ABCXYZ" }
    ]
  ],

}