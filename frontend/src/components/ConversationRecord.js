export const ConversationRecord = () => {
  return (
    <div className="formAll">
      <div className="formSection">
        <div
          style={{
            width: "90%",
            padding: "3%",
            borderRadius: "25px",
            backgroundColor: "rgba(255, 255, 255, 0.292)",
            boxShadow: "rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset",
            color: "rgb(255, 255, 255)",
            marginBottom: "3rem",
          }}
        >
          <h1>Conversation Recording Log</h1>
          <div className="conversationRecord">
            <iframe
              src="https://surveys.teachinglab.org/jfe/form/SV_0CEMeugJt9pUXJQ"
              title="Conversation Record Form"
              style={{
                width: "100%",
                height: "800px",
                border: "none",
                borderRadius: "10px",
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
