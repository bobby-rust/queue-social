import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

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

		console.log("New user: ", newUser);

		await newUser.save();
		return new Response(JSON.stringify({ success: true, data: newUser }), { status: 201 });
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify({ success: false, message: e }), { status: 500 });
	}
}
