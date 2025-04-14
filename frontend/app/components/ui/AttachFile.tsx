"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Box,
    IconButton,
    Paper,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import xIcon from "@/app/public/x-icon.svg";
import attachIcon from "@/app/public/attachIcon.svg";
import attachIcon2 from "@/app/public/attachIcon2.svg";

export default function AttachFile({ toggleAttachments }: { toggleAttachments: () => void }) {
    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 1120,
                width: "100%",
                padding: 3,
                borderRadius: 6,
                bgcolor: "white",
                zIndex: 100,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: -1,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        flexGrow: 1,
                        textAlign: "center",
                    }}
                >
                    Attach a file
                </Typography>
                <IconButton>
                    <CloseIcon onClick={toggleAttachments} />
                </IconButton>
            </Box>

            <Box sx={{ position: "relative" }}>

            </Box>
        </Paper>

    )
}