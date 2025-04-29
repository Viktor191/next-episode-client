import {Switch, Flex, Text} from "@chakra-ui/react";
import {ReactNode} from "react";

interface ToggleProps {
    isChecked: boolean;
    onToggle: () => void;
    label: ReactNode;
}

export const Toggle = ({isChecked, onToggle, label}: ToggleProps) => {
    return (
        <Flex align="center" justify="center" gap={2}>
            <Text>{label}</Text>
            <Switch.Root
                checked={isChecked}
                onCheckedChange={onToggle}
                size="md"
                colorPalette="orange"
            >
                <Switch.HiddenInput/>
                <Switch.Control/>
                <Switch.Label/>
            </Switch.Root>
        </Flex>
    );
};