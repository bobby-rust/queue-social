import React from "react";
import { Field } from "formik";
import { Link as LinkIcon } from "lucide-react"; // Adjust import based on your icon library

const IconInput = ({ icon: Icon, ...props }: any) => (
	<div className="relative">
		<Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
		<Field {...props} className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500" />
	</div>
);

export default IconInput;
