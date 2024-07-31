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
	error: string | undefined;
	touched: boolean | undefined;
}

export default function TextInput(props: TextInputProps) {
	const { id, text, Icon, type, placeholder, required, error, touched } = props;
	return error && touched ? (
		<div className="tooltip tooltip-right tooltip-open tooltip-error w-full" data-tip={props.error}>
			<label className="input input-bordered flex items-center gap-2 w-full label" htmlFor={id}>
				<Icon />
				<Field className="grow w-full" type={type} id={id} name={id} placeholder={placeholder} required={required} />
			</label>
		</div>
	) : (
		<div className="w-full">
			<label className="input input-bordered flex items-center gap-2 w-full" htmlFor={id}>
				<Icon />
				<Field className="grow w-full" type={type} id={id} name={id} placeholder={placeholder} required={required} />
			</label>
		</div>
	);
}
