import {ProgressCircle, AbsoluteCenter} from "@chakra-ui/react";
import styles from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={styles["loader-overlay"]}>
            <ProgressCircle.Root value={null} size="lg">
                <ProgressCircle.Circle>
                    <ProgressCircle.Track/>
                    <ProgressCircle.Range stroke="orange"/>
                </ProgressCircle.Circle>
                <AbsoluteCenter>
                    <ProgressCircle.ValueText/>
                </AbsoluteCenter>
            </ProgressCircle.Root>
        </div>
    );
};