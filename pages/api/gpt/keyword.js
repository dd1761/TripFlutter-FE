const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Extract the main keywords from the following text: 여행 지역: 강원도, 성별: 여성, 사람 수: 3, 예산: 500000, 목적: 가족여행, 기간: 3박 4일." }
    ],
});

const keywords = completion.choices[0].message.content;
console.log(keywords);