const ErrorMsg = (error) => {
  return (
    <div className="err-block">
      <p>Произошла ошибка на сайте, подождите пару минут </p>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorMsg;
