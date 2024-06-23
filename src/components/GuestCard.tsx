import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"

interface ChildComponentProps {
    name: string;
    onButtonClick?: () => void | undefined;
}

const GuestCard: React.FC<ChildComponentProps> = ({ name, onButtonClick }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <h2>{name}</h2>
                    {
                        onButtonClick && <Button onClick={onButtonClick}>X</Button>
                    }
                </CardTitle>
            </CardHeader>
        </Card>

    )
}

export default GuestCard