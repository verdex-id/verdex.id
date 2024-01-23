/**
 * Endpoint GET /api/course
 * Find all course
 */
export async function GET(request) {
  const contohData = [
    {
      slug: "python-dasar",
      title: "Python Dasar",
      description: "Python Dasar blablabla",
      price: 0,
    },
    {
      slug: "php-laravel",
      title: "PHP Laravel",
      description: "Membuat website menggunakan Laravel",
      price: 0,
    },
  ];

  return Response.json(contohData);
}

/**
 * Endpoint POST /api/course
 * Create new course
 */
export async function POST(request) {
  let data = await request.json();

  // logic insert database

  return Response.json({
    status: 200,
    data: data,
    error: null,
  });
}
