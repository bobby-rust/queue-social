import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	const { method } = req;
// 	const { first_name, last_name, email, password, facebook_business_pages, credits, subscription_type } = req.body;
// 	await dbConnect();

// 	switch (method) {
// 		case "POST":
// 			const newUser = new User({
// 				first_name: first_name,
// 				last_name: last_name,
// 				email: email,
// 				password: password,
// 				facebook_business_pages: facebook_business_pages,
// 				credits: credits,
// 				subscription_type: subscription_type,
// 			});

// 			await newUser.save();
// 			res.status(201).json({ success: true, data: newUser });
// 			break;
// 		default:
// 			res.status(400).json({ success: false, message: "Invalid request method." });
// 			break;
// 	}
// }

export async function POST(req: Request) {
	try {
		await dbConnect();
		const body = await req.json();

		const { firstName, lastName, email, password, facebookBusinessPages, credits, subscriptionType } = body;

		const newUser = new User({
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
			facebook_business_pages: facebookBusinessPages,
			credits: credits,
			subscription_type: subscriptionType,
		});

		await newUser.save();
		return new Response(JSON.stringify({ success: true, data: newUser }), { status: 201 });
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify({ success: false, message: e }), { status: 500 });
	}
}
