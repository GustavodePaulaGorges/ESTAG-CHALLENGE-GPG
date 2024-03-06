const form = document.getElementById('form');

form.addEventListener('submit', async event => {
    event.preventDefault();
  
    const data = new FormData(form);
  
    try {
      const res = await fetch(
        'http://localhost/routers/categories.php',
        {
          method: 'POST',
          body: data,
        },
      );
  
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error.message);
    }
  });