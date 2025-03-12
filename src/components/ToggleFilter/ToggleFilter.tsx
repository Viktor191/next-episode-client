import {Switch, Stack, Text} from "@chakra-ui/react"

interface ToggleFilterProps {
    isChecked: boolean;
    onToggle: () => void;
}

export const ToggleFilter = ({isChecked, onToggle}: ToggleFilterProps) => {
    const currentYear = new Date().getFullYear();

    return (
        <Stack direction="row" align="center" gap="2">
            <Text>Только релизы {currentYear} года</Text>
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
        </Stack>
    );
};