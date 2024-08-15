import React, { ElementType } from "react";
import { Select } from "@/app/components/ui/select";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

interface PageSelectProps {
    Icon: ElementType;
    pages: string[];
    setFieldValue: any;
    social: string;
    field: string;
}

const PageSelect = ({ Icon, pages, setFieldValue, social, field }: PageSelectProps) => {
    console.log("Page select component got pages: ", pages);

    return (
        <Select.Root
            positioning={{ sameWidth: true }}
            width=""
            {...Select.RootProps}
            items={pages}
            onValueChange={({ value }) => setFieldValue(field, value)}
            multiple
        >
            <div className="flex gap-2">
                <Icon />
                <Select.Label>{`${social} Pages`}</Select.Label>
            </div>
            <Select.Control className="bg-white border-gray-200 border-[1px] rounded-lg w-full">
                <Select.Trigger>
                    <Select.ValueText
                        className="p-2 whitespace-nowrap overflow-hidden text-ellipsis"
                        placeholder={`Select ${social} Pages`}
                    />
                    <ChevronsUpDownIcon />
                </Select.Trigger>
            </Select.Control>
            <Select.Positioner>
                <Select.Content>
                    <Select.ItemGroup>
                        <Select.ItemGroupLabel>{`${social} Pages`}</Select.ItemGroupLabel>
                        {pages.map((page: any, i: number) => (
                            <Select.Item key={i} item={page}>
                                <Select.ItemText>{page}</Select.ItemText>
                                <Select.ItemIndicator>
                                    <CheckIcon />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.ItemGroup>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};

export default PageSelect;
