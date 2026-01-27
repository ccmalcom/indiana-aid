"use client";

import ExcellentExport from "excellentexport";

export default function ExportButton({ subscribers }) {
    const handleExport = () => {
        // Convert subscriber objects to 2D array with header row first
        const dataArray = [
            ["First Name", "Last Name", "Email", "Subscribed Date"], // Header row
            ...subscribers.map((sub) => [
                sub.first_name || "",
                sub.last_name || "",
                sub.email,
                new Date(sub.created_at).toLocaleDateString(),
            ]),
        ];

        const filename = `subscribers_${new Date().toISOString().split("T")[0]}`;

        ExcellentExport.convert(
            {
                openAsDownload: true,
                filename: filename,
                format: "xlsx",
            },
            [
                {
                    name: "Subscribers",
                    from: {
                        array: dataArray,
                        arrayHasHeader: true,
                    },
                },
            ]
        );
    };

    return (
        <button
            onClick={handleExport}
            className="bg-green text-white px-4 py-2 rounded-lg hover:bg-green hover:brightness-110 transition-colors"
        >
            Export Subscribers as Excel File
        </button>
    );
}