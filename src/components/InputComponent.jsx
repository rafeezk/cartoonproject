import PropTypes from 'prop-types'
const InputComponent = ({ type, titleInput, value, valueHandler, placeholder, id, isTitle, minValue, maxValue }) => {
    return (
        <div>
            {
                isTitle && (
                    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{titleInput}</label>
                )
            }
            <input type={type} name={id} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5" placeholder={placeholder} value={value} onChange={valueHandler} min={minValue} max={maxValue} />
        </div>
    )
}
InputComponent.propTypes = {
    type: PropTypes.string.isRequired,
    titleInput: PropTypes.string,
    value: PropTypes.string.isRequired,
    valueHandler: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string.isRequired,
    isTitle: PropTypes.bool.isRequired,
    minValue: PropTypes.string,
    maxValue: PropTypes.string
}
export default InputComponent
