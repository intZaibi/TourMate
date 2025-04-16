

async function api() {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    console.log('Error:', res)
  }
  console.log(res)
}

api()