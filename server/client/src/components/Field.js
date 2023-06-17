import React from "react";

function Field({ title, input, onChangeHandler, Icon, iconPosition = "left", className }) {
  return (
    <section className={`inputContainerField ${className}`}>
      {title && <label htmlFor={input?.id}>{title}</label>}
      <section>
        {input && iconPosition === "right" ? (
          <>
            <input {...input} onChange={onChangeHandler} /> {Icon && Icon}
          </>
        ) : (
          <>
            {Icon && Icon} <input {...input} onChange={onChangeHandler} />
          </>
        )}
      </section>
    </section>
  );
}

export default Field;
