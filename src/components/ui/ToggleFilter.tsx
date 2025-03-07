import {Switch} from "@chakra-ui/react";

interface ToggleFilterProps {
    isChecked: boolean;
    onToggle: () => void;
}

export const ToggleFilter = ({isChecked, onToggle}: ToggleFilterProps) => {
    return (
        <Switch.Root checked={isChecked} onCheckedChange={onToggle} size="md">
            <Switch.HiddenInput/>
            <Switch.Control/>
            <Switch.Label>Отображать только релизы этого года</Switch.Label>
        </Switch.Root>
    );
};