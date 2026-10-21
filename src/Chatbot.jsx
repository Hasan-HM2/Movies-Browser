import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Zoom,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // أيقونة البوت
import PersonIcon from "@mui/icons-material/Person"; // أيقونة المستخدم

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "مرحباً! أنا خبيرك السينمائي. اسألني عن ترشيحات الأفلام، الممثلين، أو أي شيء يخص السينما!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // مرجع للتمرير التلقائي للأسفل
  const messagesEndRef = useRef(null);

  // دالة التمرير التلقائي
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // تنفيذ التمرير كلما تغيرت الرسائل أو حالة الكتابة
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // الكود الحالي للاتصال بالخادم (تركناه كما هو لنصلحه لاحقاً)
      const response = await axios.post("/api/chat", { input: userMsg.text });
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "عذراً، فقدت الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* الزر العائم */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <Fab
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
          sx={{ boxShadow: 3 }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Box>

      {/* نافذة الدردشة مع حركة Zoom */}
      <Zoom in={isOpen}>
        <Paper
          elevation={10}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 4,
            border: "1px solid #e0e0e0",
          }}
        >
          {/* رأس النافذة */}
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <SmartToyIcon />
            <Typography
              variant="h6"
              sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              المساعد السينمائي
            </Typography>
          </Box>

          {/* منطقة عرض الرسائل */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#f4f6f8",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  alignItems: "flex-end",
                  gap: 1,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                {/* الأيقونة */}
                <Avatar
                  sx={{
                    bgcolor:
                      msg.sender === "user" ? "primary.main" : "secondary.main",
                    width: 28,
                    height: 28,
                  }}
                >
                  {msg.sender === "user" ? (
                    <PersonIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <SmartToyIcon sx={{ fontSize: 18 }} />
                  )}
                </Avatar>

                {/* فقاعة النص */}
                <Box
                  sx={{
                    bgcolor: msg.sender === "user" ? "primary.main" : "white",
                    color: msg.sender === "user" ? "white" : "text.primary",
                    p: 1.5,
                    borderRadius: 3,
                    borderBottomLeftRadius: msg.sender === "bot" ? 0 : 3,
                    borderBottomRightRadius: msg.sender === "user" ? 0 : 3,
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      direction: "rtl",
                      textAlign: "right",
                      lineHeight: 1.6,
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* مؤشر الكتابة الاحترافي */}
            {isTyping && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "flex-end",
                  alignSelf: "flex-start",
                }}
              >
                <Avatar
                  sx={{ bgcolor: "secondary.main", width: 28, height: 28 }}
                >
                  <SmartToyIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 1.5,
                    borderRadius: 3,
                    borderBottomLeftRadius: 0,
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <CircularProgress size={16} color="inherit" />
                </Box>
              </Box>
            )}
            {/* عنصر فارغ ليتم التمرير إليه */}
            <div ref={messagesEndRef} />
          </Box>

          {/* حقل الإدخال */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: "white",
              borderTop: "1px solid #eee",
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="اسأل عن أي فيلم..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              sx={{ "& input": { direction: "rtl", textAlign: "right" } }}
            />
            <IconButton
              onClick={handleSend}
              disabled={isTyping}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <SendIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Paper>
      </Zoom>
    </>
  );
}
