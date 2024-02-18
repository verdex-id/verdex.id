import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { comparePassword } from "@/lib/password";

export async function POST(request) {
    const req = await request.json();
  
    const arg = {
      where: {
        id: req._id,
      },
    };
  
    const user = await prisma.user.findUnique(arg);
  
    const match = await comparePassword(req.password, user.hashed_password);
  
    return Response.json({
      status: 200,
      data: { match },
      error: null,
    });
  }







// import { helloWorld } from "@/lib/password";


// export async function GET   (request){
//     const hasil = helloWorld ("pohan")
    
//     return Response.json({
//         status: 200,
//         data: hasil,
//         error: null,
//       });
// }
