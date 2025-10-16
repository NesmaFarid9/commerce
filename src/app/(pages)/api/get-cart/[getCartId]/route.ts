// import { getUserToken } from "@/Uitaltis/getToken";
// import toast from "react-hot-toast";

// export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
//   const token = await getUserToken();
//   if (!token) {
//   toast.error("Please login first");
//   return;
// }
//   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${params.id}`, {
//     method: "DELETE",
//     headers: { token: token + "" },
//   });
//   const data = await res.json();
//   return Response.json(data);
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const token = await getUserToken();
//   if (!token) {
//   toast.error("Please login first");
//   return;
// }
//   const body = await req.json();
//   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${params.id}`, {
//     method: "PUT",
//     headers: {
//       token: token + "",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   const data = await res.json();
//   return Response.json(data);
// }


import { getUserToken } from "@/Uitaltis/getToken";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const token = await getUserToken();
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${params.id}`, {
    method: "DELETE",
    headers: { token: token ?? "" },
  });
  const data = await res.json();
  return Response.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const token = await getUserToken();
  const body = await req.json();
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${params.id}`, {
    method: "PUT",
    headers: {
      token: token ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}
