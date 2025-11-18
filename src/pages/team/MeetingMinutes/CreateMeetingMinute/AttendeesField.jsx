const AttendeesField = ({ attendees, setAttendees }) => {
  const handleAddAttendee = () => {
    const name = prompt("참석자 이름을 입력하세요:");
    if (name && name.trim()) {
      const newList = [...attendees, name.trim()];
      setAttendees(newList);
    }
  };

  const handleRemoveAttendee = (indexToRemove) => {
    const newList = attendees.filter((_, index) => index !== indexToRemove);
    setAttendees(newList);
  };

  return (
    <div className="CMM__field">
      <span className="CMM__label">참석자</span>
      <div className="CMM__attendees">
        {attendees.map((name, idx) => (
          <span key={idx} className="CMM__attendee">
            <span className="CMM__circle"></span>
            {name}
            {attendees.length > 1 && (
              <button
                className="CMM__removeAttendee"
                onClick={() => handleRemoveAttendee(idx)}
                title="참석자 제거"
              >
                ×
              </button>
            )}
          </span>
        ))}
        <button className="CMM__addAttendee" onClick={handleAddAttendee}>
          +
        </button>
      </div>
    </div>
  );
};

export default AttendeesField;