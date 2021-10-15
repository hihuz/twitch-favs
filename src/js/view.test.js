const rewire = require("rewire")
const view = rewire("./view")
const instantiateTemplate = view.__get__("instantiateTemplate")
const hideLoader = view.__get__("hideLoader")
const showLoader = view.__get__("showLoader")
const hideDialog = view.__get__("hideDialog")
const showDialog = view.__get__("showDialog")
const hideAlert = view.__get__("hideAlert")
const showAlert = view.__get__("showAlert")
const appendLast = view.__get__("appendLast")
const bindNav = view.__get__("bindNav")
const removeChannelDOM = view.__get__("removeChannelDOM")
const filterDOMList = view.__get__("filterDOMList")
const raiseDuplicateError = view.__get__("raiseDuplicateError")
const raise404Error = view.__get__("raise404Error")
const raiseGenericError = view.__get__("raiseGenericError")
// @ponicode
describe("instantiateTemplate", () => {
    test("0", () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["a", "b", "043", "foo bar"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], [10, -45.9, 103.5, 0.955674], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        let callFunction = () => {
            instantiateTemplate(["Anas", "Edmond", "Jean-Philippe"], param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        let callFunction = () => {
            instantiateTemplate(["Michael", "Edmond", "Edmond"], param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        let callFunction = () => {
            instantiateTemplate(["Pierre Edouard", "Anas", "Michael"], param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [[10, -45.9, 103.5, 0.955674], [10, -45.9, 103.5, 0.955674], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5]]
        let param2 = [object, object2, object3]
        let callFunction = () => {
            instantiateTemplate(["Anas", "Michael", "George"], param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object2 = [["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"], ["elio@example.com", "Elio", "Dillenberg"]]
        let object3 = [[10, -45.9, 103.5, 0.955674], [-1, 0.5, 1, 2, 3, 4, 5], ["elio@example.com", "Elio", "Dillenberg"]]
        let param2 = [object, object2, object3]
        let callFunction = () => {
            instantiateTemplate(["Jean-Philippe", "Michael", "Michael"], param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            instantiateTemplate(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("hideLoader", () => {
    test("0", () => {
        let callFunction = () => {
            hideLoader()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("showLoader", () => {
    test("0", () => {
        let callFunction = () => {
            showLoader()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("hideDialog", () => {
    test("0", () => {
        let callFunction = () => {
            hideDialog()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("showDialog", () => {
    test("0", () => {
        let callFunction = () => {
            showDialog("Unknown error")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            showDialog("Ran out of iterations")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            showDialog("Mock Error Message")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            showDialog("Could not find an existing submission in location.  rubric is original.")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            showDialog("Error selecting from database")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            showDialog(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("hideAlert", () => {
    test("0", () => {
        let callFunction = () => {
            hideAlert()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("showAlert", () => {
    test("0", () => {
        let callFunction = () => {
            showAlert("Wait time out reached, while waiting for results")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            showAlert("Unknown Error")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            showAlert("Could not find a grader object for message from xqueue")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            showAlert("Could not find an existing submission in location.  rubric is original.")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            showAlert("Unable to find your git executable - Shutdown SickBeard and EITHER <a href=\"http://code.google.com/p/sickbeard/wiki/AdvancedSettings\" onclick=\"window.open(this.href); return false;\">set git_path in your config.ini</a> OR delete your .git folder and run from source to enable updates.")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            showAlert(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("appendLast", () => {
    test("0", () => {
        let callFunction = () => {
            appendLast({ appendChild: () => "Gail Hoppe" }, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            appendLast({ appendChild: () => "Maurice Purdy" }, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            appendLast({ appendChild: () => "Ronald Keeling" }, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            appendLast({ appendChild: () => "Gail Hoppe" }, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            appendLast({ appendChild: () => "Janet Homenick" }, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            appendLast(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("bindNav", () => {
    test("0", () => {
        let callFunction = () => {
            bindNav()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("removeChannelDOM", () => {
    test("0", () => {
        let callFunction = () => {
            removeChannelDOM("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            removeChannelDOM("Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            removeChannelDOM("Edmond")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            removeChannelDOM("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            removeChannelDOM("Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            removeChannelDOM(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("filterDOMList", () => {
    test("0", () => {
        let callFunction = () => {
            filterDOMList([10, -45.9, 103.5, 0.955674])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            filterDOMList([-1, 0.5, 1, 2, 3, 4, 5])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            filterDOMList(["a", "b", "043", "holasenior"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            filterDOMList(["foo bar", -0.353, "**text**", 4653])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            filterDOMList(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("raiseDuplicateError", () => {
    test("0", () => {
        let callFunction = () => {
            raiseDuplicateError(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            raiseDuplicateError(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            raiseDuplicateError("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            raiseDuplicateError("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            raiseDuplicateError("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            raiseDuplicateError(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("raise404Error", () => {
    test("0", () => {
        let callFunction = () => {
            raise404Error("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            raise404Error("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            raise404Error("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            raise404Error(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            raise404Error(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            raise404Error(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("raiseGenericError", () => {
    test("0", () => {
        let callFunction = () => {
            raiseGenericError()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("view.init", () => {
    test("0", () => {
        let callFunction = () => {
            view.init()
        }
    
        expect(callFunction).not.toThrow()
    })
})
