import { Button } from "@/components/ui/button";
import React from "react";

interface PrimaryButtonProps {
	text: string;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
	return <Button className="bg-blue-600 hover:bg-blue-600 hover:bg-opacity-90">{props.text}</Button>;
}
