import { Field } from "formik";
import { LucideProps, User } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface TextInputProps {
	id: string;
	text: string;
	Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	type: string;
	placeholder: string;
	required: boolean;
}

export default function TextInput(props: TextInputProps) {
	const { id, text, Icon, type, placeholder, required } = props;
	return (
		<label className="input input-bordered flex items-center gap-2 w-full" htmlFor={id}>
			<Icon />
			<Field className="grow" type={type} id={id} name={id} placeholder={placeholder} required={required} />
		</label>
	);
}
