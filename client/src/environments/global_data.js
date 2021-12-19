export const GlobalVariables = {

  downloadCSVFile: (data, filename) => {
    let blob = new Blob([data], { type: 'text/csv' });
    let dataURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  }

}