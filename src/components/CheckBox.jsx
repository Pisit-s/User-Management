export function CheckBoxInterest ({interest}) {
    return (
        <>
          <div className="space-y-2">
              <div key={interest} className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    id={interest}
                    name="interests"
                    value={interest}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">{interest}</span>
                </label>
              </div>
          </div>
        </>
    )
}