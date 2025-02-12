"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    IconButton,
    Paper,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

// Top icons
import icon21 from "@/app/public/description-icons/21.svg";
import icon20 from "@/app/public/description-icons/20.svg";
import icon19 from "@/app/public/description-icons/19.svg";
import icon18 from "@/app/public/description-icons/18.svg";
import icon17 from "@/app/public/description-icons/17.svg";
import icon16 from "@/app/public/description-icons/16.svg";
import icon15 from "@/app/public/description-icons/15.svg";
import icon14 from "@/app/public/description-icons/14.svg";
import icon13 from "@/app/public/description-icons/13.svg";
import icon12 from "@/app/public/description-icons/12.svg";
import icon11 from "@/app/public/description-icons/11.svg";
import icon10 from "@/app/public/description-icons/10.svg";
import icon9 from "@/app/public/description-icons/9.svg";

// Bottom icons
import icon8 from "@/app/public/description-icons/8.svg";
import icon7 from "@/app/public/description-icons/7.svg";
import icon6 from "@/app/public/description-icons/6.svg";
import icon5 from "@/app/public/description-icons/5.svg";
import icon4 from "@/app/public/description-icons/4.svg";
import icon3 from "@/app/public/description-icons/3.svg";
import icon2 from "@/app/public/description-icons/2.svg";
import icon1 from "@/app/public/description-icons/1.svg";

export default function AddDescription({ toggleDescription }: any) {
    const [description, setDescription] = useState("");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

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
                    Add a description
                </Typography>
                <IconButton>
                    <CloseIcon onClick={toggleDescription} />
                </IconButton>
            </Box>

            {/* Textarea */}
            <Box sx={{ position: "relative" }}>
                {/* Top Icons with separators */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 30,
                        left: 16,
                        display: "flex",
                        flexWrap: "wrap", // Allow icons to wrap onto the next row
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon21} alt="Underline" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 24, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon20} alt="Bold" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon19} alt="Italic" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon18} alt="Strike" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 24, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon17} alt="List" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon16} alt="Quote" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 24, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon15} alt="Code" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon14} alt="Link" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 24, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon13} alt="Image" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon12} alt="Video" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon11} alt="Attachment" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 24, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon10} alt="Table" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon9} alt="List Item" width={24} height={24} />
                    </Box>
                </Box>

                {/* Horizontal Box separator under the top icons */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 60,
                        left: 0,
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#ccc",
                    }}
                />

                {/* Placeholder and Textarea */}
                <TextareaAutosize
                    minRows={5}
                    placeholder="Add a more detailed description...
    Make your description even better. Type '/' to insert content, formatting and more..."
                    style={{
                        width: "100%",
                        padding: "12px",
                        paddingTop: windowWidth <= 710 ? "150px" : "50px",
                        paddingBottom: windowWidth <= 710 ? "90px" : "50px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        marginTop: "16px",
                        fontFamily: "inherit",
                    }}
                    value={description}
                    onChange={handleInput}
                />

                {/* Bottom Icons with separators */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 50,
                        left: 0,
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#ccc",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 18,
                        left: 16,
                        display: "flex",
                        flexWrap: "wrap", // Allow bottom icons to wrap onto the next row
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon8} alt="Undo" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 20, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon7} alt="Redo" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon6} alt="Emojis" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon5} alt="Hashtags" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 20, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon4} alt="Mentions" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon3} alt="Files" width={24} height={24} />
                    </Box>
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon2} alt="Poll" width={24} height={24} />
                    </Box>
                    <Box sx={{ height: 20, width: 2, bgcolor: "grey.400", mx: 1 }} />
                    <Box
                        sx={{
                            "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                        }}
                    >
                        <Image src={icon1} alt="Link" width={24} height={24} />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
