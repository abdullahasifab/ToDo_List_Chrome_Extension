Swal.fire({
    title: 'Installation Complete!',
    text: 'Your ToDo List is ready to use!',
    icon: 'success',
    confirmButtonText: 'OK',
    allowOutsideClick: false
  }).then(() => {
    chrome.runtime.sendMessage({ action: 'open_extension' });
    setTimeout(() => {
      window.close();
    }, 5000);
  });
  